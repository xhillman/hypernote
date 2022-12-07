import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import {v4 as uuidV4} from 'uuid';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const navigateHome = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })

    navigateHome('..');
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect 
              onCreateOption={label => {
                const newTag = {id: uuidV4(), label}
                onAddTag(newTag)
                setSelectedTags([...selectedTags, newTag])
              }}
              value={selectedTags.map(tag => { 
                return { label: tag.label, value: tag.id }
              })} 
              options={availableTags.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              onChange={tags => {
                setSelectedTags(tags.map(tag => {
                  return { id: tag.value, label: tag.label }
                }))
              }}
              isMulti />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Note:</Form.Label>
          <Form.Control ref={markdownRef} as="textarea" rows={15} required />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className='justify-content-end'>
          <Button type="submit" variant='primary'>Save</Button>
          <Link to='..'>
            <Button type="button" variant='outline-secondary'>Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}