import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SimpleNote } from "./NoteList";

export function NoteCard({note}: {note: SimpleNote}) {

  const {id, title, tags} = note;
  return (
    <Card as={Link} to={`/${id}`} className='h-100 text-reset text-decoration-none'>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  )
}