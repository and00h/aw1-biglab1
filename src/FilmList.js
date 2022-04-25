import dayjs from 'dayjs';
import { useState } from 'react';
import { Container, Col, Row, Form, ListGroup, ButtonGroup, Button } from 'react-bootstrap';
import SideNav from './Sidebar.js';

function Star(props) {
  const classes = `bi ${props.filled ? "bi-star-fill" : "bi-star"}`;
  return <i className={classes} style={{ color: "black" }}></i>;
}

function Rating(props) {
  return (
    <>
      {
        [...Array(5).keys()].map(x => <Star key={x} filled={x < props.rating} />)
      }
    </>
  );
}

function FilmItem(props) {
  return (
    <ListGroup.Item className="pt-3 pb-3">
      <Container fluid>
        <Row>
          <Col md={4} sm={12}>
            <span style={props.film.favorite ? { color: "red" } : {}}>
              {props.film.title}
            </span>
          </Col>
          <Col md={2} sm={12}>
            <Form>
              <Form.Check type="checkbox" label="Favorite" checked={props.film.favorite} readOnly />
            </Form>
          </Col>
          <Col md={2} sm={12}>
            {props.film.watchdate ? dayjs(props.film.watchdate).format("YYYY-MM-DD") : ""}
          </Col>
          <Col md={2} sm={12}>
            <Rating rating={props.film.rating} />
          </Col>
          <Col md={2} sm={12}>
            <ButtonGroup>
              <Button variant={props.editing ? "success" : "light"}>
                {
                  props.editing ?
                    <i className="bi bi-check" style={{ color: "white" }}></i>
                    : <i className="bi bi-pencil" style={{ color: "black" }}></i>
                }
              </Button>
              <Button variant="danger" onClick={() => props.deleteFilm(props.film.id)} disabled={props.editing}>
                <i className="bi bi-trash" style={{ color: "white" }}></i>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  )
}

function FilmList(props) {
  return (
    <>
      <ListGroup variant="flush">
        {
          props.films.map(film => {
            return <FilmItem key={film.id} film={film} deleteFilm={props.onDelete} />;
          })
        }
      </ListGroup>
    </>
  );
}

function FilmDatabase(props) {
  const filters = ["All", "Favorites", "Best Rated", "Seen Last Month", "Unseen"];
  const filterCallbacks = [
    () => { return props.library.films; },
    props.library.getFavorites,
    () => { return props.library.getRated().filter(f => f.rating == 5); },
    props.library.getSeenLastMonth,
    () => { return props.library.films.filter(f => !f.watchdate); }
  ]

  let [selected, setSelected] = useState(0);
  let [films, setFilms] = useState(props.library.films);

  const select = (index) => {
    setSelected(index);
    setFilms(filterCallbacks[index]());
  }

  const deleteFilm = (filmId) => {
    props.library.deleteFilm(filmId);
    setFilms(filterCallbacks[selected]());
  }

  return (
    <Container fluid className="d-flex flex-column h-100">
      <Row className="flex-grow-1 h-100">
        <Col md={3} sm={12}>
          <SideNav filters={filters} selectedIndex={selected} select={select} />
        </Col>
        <Col md={9} sm={12}>
          <Container fluid className="d-flex flex-column h-100">
            <Row>
              <h1 id="title" className="p-3">{filters[selected]}</h1>
              <FilmList films={films} onDelete={deleteFilm}></FilmList>
            </Row>
            <Row className="mt-auto">
              <div className="d-flex flex-row-reverse p-2">
                <button style={{ borderRadius: 50, width: "48px", height: "48px", fontSize: "1.3em" }} type="button" className="btn btn-primary">+</button>
              </div>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}



export default FilmDatabase;