import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SimpleNote } from "./NoteList";

import '../styles/NoteCard.css'

export function NoteCard({note}: {note: SimpleNote}) {

  const {id, title, tags} = note;
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none card`}>
      <Card.Body>
        <Stack gap={2} className='align-items-center justify-content-center h-100'>
          <span className='fs-5'>{title}</span>
          {
            tags.length > 0 && (
              <Stack gap={1} direction='horizontal' className='justify-content-center flex-wrap'>
                {tags.map(tag => (
                  <Badge key={tag.id} className='text-truncate'>{tag.label}</Badge>
                ))}
              </Stack>
            )
          }
        </Stack>
      </Card.Body>
    </Card>
  )
}