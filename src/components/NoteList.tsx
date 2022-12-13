import { Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NoteList() {

  

  return (
    <>
      <Row>
        <Col><h1>Notes</h1></Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>New Note</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </>
  )
}