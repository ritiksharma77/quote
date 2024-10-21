import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QuoteListPage.css";

interface Quote {
  text: string;
  mediaUrl: string;
  username: string;
  createdAt: string;
}

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [limit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
  }, [offset]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: token || "",
          },
        }
      );

      const data = await response.json();
      const fetchedQuotes = data.data;
      if (response.ok && fetchedQuotes.length > 0) {
        setQuotes((prev) => [...prev, ...fetchedQuotes]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching quotes", err);
    }
  };

  const loadMore = () => {
    setOffset(offset + limit);
  };

  return (
    <div className="quote-list-page">
      <h2>Quotes</h2>
      <div className="quotes-container">
        {quotes.map((quote, index) => (
          <div className="quote-card" key={index}>
            <div className="image-overlay">
              <img src={quote.mediaUrl} alt="quote" />
              <div className="quote-text">{quote.text}</div>
            </div>
            <p>Posted by: {quote.username}</p>
            <p>Created at: {quote.createdAt}</p>
          </div>
        ))}
      </div>
      {hasMore && <button onClick={loadMore}>Load More</button>}
      <button
        className="floating-button"
        onClick={() => navigate("/create-quote")}
      >
        +
      </button>
    </div>
  );
};

export default QuoteListPage;
