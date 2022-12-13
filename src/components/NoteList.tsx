import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import { NoteCard } from "./NoteCard";

export type SimpleNote = {
  id: string,
  title: string,
  tags: Tag[]
}

type NoteListProps = {
  availableTags: Tag[]
  notes: SimpleNote[]
}

export function NoteList({ availableTags, notes }: NoteListProps) {

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');

  const filteredNotes = useMemo(() => {
    // filter notes by title and selected tags
    return notes.filter(note => {
      // if title is empty string or any note title includes title
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        // if no tags are selected or every selected tag is in note tags
        (selectedTags.length === 0 ||
          // loop through selected tags to make sure ALL tags are in note tags
          selectedTags.every(tag =>
            // check if current note tags includes tag
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
    // update on change of title, selectedTags, or notes
  }, [title, selectedTags, notes])

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col><h1>Notes</h1></Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>New Note</Button>
            </Link>
            <Button variant='outline-secondary'>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text'
                placeholder='Name your note...'
                value={title}
                onChange={e => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
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
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes.map(note => {
          return (
            <Col key={note.id}>
              <NoteCard note={note} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}