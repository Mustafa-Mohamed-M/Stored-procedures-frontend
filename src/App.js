import { useCallback, useEffect, useState } from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    // clear any displayed products
    setProducts([]);
    // TODO: add pagination and use dynamic query parameters in query below
    try {
      const { data } = await axios.get(
        `http://localhost:5003/products/products?limit=10&page=1`
      );
      console.log({data});
      setProducts(data.data);
    } catch (error) {
      // TODO: error handling
    }
  }, []);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Container style={{ marginTop: 50 }}>
        <Row style={{marginBottom: 5}}  >
          <Col className="d-flex justify-content-end">
            <Button variant="primary" size="sm">
              Add product
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>List price</th>
                  <th>Product model</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const {
                    productId,
                    productName,
                    listPrice,
                    productModel,
                    categoryName,
                    brandName,
                  } = product;
                  return (
                    <tr key={productId}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>{productName}</td>
                      <td style={{ textAlign: "center" }}>{listPrice}</td>
                      <td>{productModel}</td>
                      <td>{categoryName}</td>
                      <td>{brandName}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          style={{ margin: 5 }}
                        >
                          Edit
                        </Button>
                        <Button variant="danger" size="sm">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
