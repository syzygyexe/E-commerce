import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {/* .keys() is takinn keys from the object */}
        {/* ...Arrray(4) === [0, 1, 2, 3] */}
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            // x+1 stands for the pageNumber which is dynamic.
            key={x + 1}
            to={
              // Render different buttons for admin product list and ordinary product list, based on the isAdmin status.
              // Initially, the value isAdmin set to false. Inside of the admin's ProductListScreen we want to set it to true.
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
