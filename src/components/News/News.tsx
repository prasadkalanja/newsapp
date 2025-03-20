import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { capitaLize, header } from "../../config/config";
import { card, Header } from ".";
import NoDataFound from "../NoDataFound/NoDataFound";
import { Col, Container, Row } from "react-bootstrap";
import NewsCard from "../NewsCard/NewsCard";
import "./News.css"
import React from "react"
interface NewsProps {
    personalized?: boolean;
    handleShowSidebar?: () => void;
}

function News({ personalized, handleShowSidebar }: NewsProps) {
     console.log(personalized);

    const personalizedClass = personalized ? "personalized" : "";

    let { articles, status, filters } = useSelector(
        (state: any) => state.articles
    );
    articles = personalized ? personalized : articles;

    const heading = personalized
        ? "personalized"
        : filters.query
            ? filters.query
            : filters.category;

    const openOptions = () => {
        if (handleShowSidebar) {
            handleShowSidebar();
        }
    };
console.log("ar",articles);


    return (
        <>
            {status === "loading" ? (
                <Loading />
            ) : personalized && articles.length < 1 ? (
                <>
                    <div className="notify-container" onClick={openOptions}>
                        <span className="">
                            Click here or above Button to select options for Personalized News
                        </span>
                    </div>
                </>
            ) : (
                <div className={personalizedClass}>
                    <Header>{header(capitaLize(heading))}</Header>
                    {articles.length < 1 ? (
                        <NoDataFound />
                    ) : (
                        <Container>
                            <Row>
                                {articles.map((element: any, index: any) => {
                                    return (
                                        <Col sm={12} md={6} lg={4} xl={3} style={card} key={index}>
                                            <NewsCard
                                                title={element.title}
                                                description={element.description}
                                                published={element.publishedAt}
                                                channel={element.source}
                                                alt="News image"
                                                publishedAt={element.publishedAt}
                                                imageUrl={element.imgSrc}
                                                urlNews={element.url}
                                                author={element.author}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Container>
                    )}
                </div>
            )}
        </>
    )
}
export default News