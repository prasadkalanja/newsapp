import React from "react";
import { Button, Card } from "react-bootstrap";
import "./NewsCard.css";
import { Details } from "../index";

function NewsCard({ imageUrl, alt, description, title, channel, published, urlNews, author }: any) {

  return (
    <Card className="card">
      <Card.Img className="card-img" variant="top" src={imageUrl} alt={alt} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description?.substr(0, 150)}</Card.Text>
        <Details channel={channel} published={published} author={author} />
        <Button
          className="card-btn"
          href={urlNews}
          target="_blank"
        >
          Read more
        </Button>
      </Card.Body>
    </Card>
  )
}

export default NewsCard