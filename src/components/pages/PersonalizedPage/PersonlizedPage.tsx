import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";

import "./PersonalizedPage.css";
import { useDispatch, useSelector } from "react-redux";
import { News } from "../../../components";
import {
  setPreferredAuthors,
  setPreferredCategories,
  setPreferredSources,
} from "../../../store/slices/articleSlice";
import React from "react";
function PersonalizedPage() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { articles } = useSelector((state: any) => state.articles);
  const [selectedSources, setSelectedSources] = useState([] as any);
  const [selectedAuthors, setSelectedAuthors] = useState([] as any);
  const [selectedCategories, setSelectedCategories] = useState([] as any);

  const handleCloseSidebar = () => setShow(false);
  const handleShowSidebar = () => setShow(true);

  const handleAuthorCheckboxChange = (source: any) => {
    setSelectedAuthors((prevSelectedSources: any) =>
      prevSelectedSources.includes(source)
        ? prevSelectedSources.filter((s: any) => s !== source)
        : [...prevSelectedSources, source]
    );
    dispatch(setPreferredAuthors(selectedAuthors));
  };

  const handleSourcesCheckboxChange = (author: any) => {
    setSelectedSources((prevSelectedAuthors: any) =>
      prevSelectedAuthors.includes(author)
        ? prevSelectedAuthors.filter((s: any) => s !== author)
        : [...prevSelectedAuthors, author]
    );
    dispatch(setPreferredSources(selectedSources));
  };

  const handleCategoriesCheckboxChange = (category: any) => {
    setSelectedCategories((prevSelectedCategories: any) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((s: any) => s !== category)
        : [...prevSelectedCategories, category]
    );
    dispatch(setPreferredCategories(selectedCategories));
  };

  const uniqueSources = [
    ...new Set(articles.map((article: any) => article.source)),
  ];
  const uniqueAuthors = [
    ...new Set(articles.map((article: any) => article.author)),
  ];
  const uniqueCategories = [
    ...new Set(articles.map((article: any) => article.category)),
  ];

  // If all unique sources are selected, return all articles
  const filteredArticles =
    selectedSources.length === uniqueSources.length
      ? articles
      : articles.filter(
          (article: any) =>
            selectedSources.includes(article.source) ||
            selectedAuthors.includes(article.author) ||
            selectedCategories.includes(article.category)
        );

  console.log(filteredArticles);

  return (
    <>
      <div
        className="mt-500"
        style={{
          color: "#fff",
          marginTop: "100px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="primary" onClick={handleShowSidebar}>
          Set Personalized News
        </Button>
      </div>
      <div>
        <News
          personalized={filteredArticles}
          handleShowSidebar={handleShowSidebar}
        />
        <Offcanvas show={show} onHide={handleCloseSidebar} variant="dark">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h3 className="personalized-header">Personalized Filter</h3>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr />
          <Offcanvas.Body>
            <h4>Filter By Sources</h4>
            <Form className="sources checkbox-container">
              {uniqueSources.map((source: any) => (
                <div key={`default-${source}`} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id={`default-${source}`}
                    value={source ? source.toString() : ""}
                    label={source}
                    checked={selectedSources.includes(source)}
                    onChange={() => handleSourcesCheckboxChange(source)}
                  />
                </div>
              ))}
            </Form>
            <hr />
            <h4>Filter By Authors</h4>
            <Form className="authors checkbox-container">
              {uniqueAuthors.map((author:  any) => (
                <div key={`default-${author}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    id={`default-${author}`}
                    label={author}
                    value={author ? author.toString() : ""}
                    checked={selectedAuthors.includes(author)}
                    onChange={() => handleAuthorCheckboxChange(author)}
                  />
                </div>
              ))}
            </Form>
            <hr />
            <h4>Filter By Categories</h4>
            <Form className="categories checkbox-container">
              {uniqueCategories.map((category : any) => (
                <div key={`default-${category}`} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id={`default-${category}`}
                    label={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoriesCheckboxChange(category)}
                  />
                </div>
              ))}
            </Form>
          </Offcanvas.Body>
          <hr />
          <div className="offcanvas-footer">
            <Button variant="primary" onClick={handleCloseSidebar}>
              Close
            </Button>
          </div>
        </Offcanvas>
      </div>
    </>
  );
}

export default PersonalizedPage;
