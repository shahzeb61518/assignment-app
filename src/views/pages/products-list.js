import React, { Component } from "react";
import {
  Container,
  Card,
  CardBody,
  Button,
  CardText,
  CardImg,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { FormGroup, Label, Input } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import ApiManager from "../../helpers/ApiManager";
import "./product-list.css";

class ProductsList extends Component {
  constructor(props) {
    super();
    this.state = {
      productList: [],
      isLoading: false,
      filterByColor: "",
      productQty: 0,
      modal: false,
      cartArr: [],
      total: null,
    };
    this.productArr = [];
    this.arr = [];
    this.index = null;
    this.itemId = null;
    this.priced = 0;
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    this.getProductList();
  }

  getProductList = () => {
    new ApiManager().getProducts().then((response) => {
      if (!response) {
        this.setState({
          isLoading: false,
        });
        return;
      }

      if (response.noResult) {
        this.setState({
          isLoading: false,
        });
        return;
      }
      if (response) {
        if (response.data) {
          console.log("Reponse data get>>>", response.data);
          this.productArr = response.data;
          this.setState({
            isLoading: false,
            productList: response.data,
          });
        }
      }
    });
  };

  changeProductListByColor = (event) => {
    this.setState({
      productList: this.productArr,
    });
    let color = event;
    if (color === "All") {
      this.setState({
        productList: this.productArr,
      });
    } else {
      let arr = this.productArr;
      let anotherArr = arr.filter((el) => el.colour === color);
      this.setState({
        productList: anotherArr,
      });
    }
  };

  removeItemModal = (props) => {
    const toggle = () => this.setState({ modal: false });

    return (
      <div>
        <Button color="danger" onClick={toggle}></Button>
        <Modal isOpen={this.state.modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
          <ModalBody>
            <h6>Are you sure you want to remove this Product?</h6>
          </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={toggle}>
              No
            </Button>{" "}
            <Button
              color="danger"
              onClick={() => {
                let arr = this.state.productList;
                arr.splice(this.index, 1);
                this.setState({
                  productList: arr,
                });

                //////////////
                // remove product item
                var id = this.itemId;
                let arrForRemove = this.state.cartArr;
                arrForRemove = arrForRemove.filter((ele, i) => ele.id !== id);
                this.setState({
                  cartArr: arrForRemove,
                });

                console.log("cart arr>", this.state.cartArr);
                /////////////////

                toggle();
              }}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  render() {
    let price = 0;
    this.state.cartArr.forEach((ele) => {
      price = ele.price + price;
    });

    return (
      <React.Fragment>
        <Container>
          <div className="remove-modal">{this.removeItemModal()}</div>
          {!this.state.isLoading ? (
            <div className="main-div">
              <Row>
                <Col></Col>
                <Col sm="10">
                  <Row>
                    <Col sm="2">
                      <FormGroup>
                        <Label for="filterByColor">Color Filter</Label>
                        <Input
                          type="select"
                          name="select"
                          id="filterByColor"
                          onChange={(e) => {
                            this.setState({
                              filterByColor: e.target.value,
                            });
                            this.changeProductListByColor(e.target.value);
                          }}
                        >
                          <option>All</option>
                          <option>Black</option>
                          <option>Stone</option>
                          <option>Red</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col></Col>
                  </Row>

                  {this.state.productList &&
                    this.state.productList.map((item, index) => {
                      let qtyArr = this.state.cartArr.filter(
                        (ele) => ele.id === item.id
                      );
                      return (
                        <Card key={index} style={{ marginTop: "10px" }}>
                          <CardBody>
                            <Row>
                              <Col sm="2">
                                <CardImg
                                  className="product-img"
                                  top
                                  src={item.img}
                                  alt="Card image cap"
                                />
                              </Col>
                              <Col>
                                <h6>{item.name}</h6>
                                <CardText className="card-text">
                                  £{item.price}
                                </CardText>
                              </Col>
                              <Col></Col>
                              <Col sm="3" className="action-btns">
                                <Row>
                                  <Col>
                                    <Button
                                      color="light"
                                      size="sm"
                                      onClick={() => {
                                        var id = item.id;
                                        let arr = this.state.cartArr;

                                        let arrOfSameid = arr.filter(
                                          (ele, i) => ele.id === id
                                        );

                                        let arrOfDiffId = arr.filter(
                                          (ele, i) => ele.id !== id
                                        );

                                        if (arrOfSameid.length > 0) {
                                          arrOfSameid.shift();
                                        }
                                        // console.log(
                                        //   "cart arrOfSameid>",
                                        //   arrOfSameid
                                        // );
                                        let concat = arrOfDiffId.concat(
                                          arrOfSameid
                                        );
                                        // console.log("cart concat>", concat);

                                        this.setState({
                                          cartArr: concat,
                                        });

                                        // console.log(
                                        //   "cart arr>",
                                        //   this.state.cartArr
                                        // );
                                      }}
                                    >
                                      -
                                    </Button>
                                  </Col>
                                  <Col>
                                    <CardText>{qtyArr.length}</CardText>
                                  </Col>
                                  <Col>
                                    <Button
                                      color="light"
                                      size="sm"
                                      onClick={() => {
                                        this.arr = this.state.cartArr;
                                        this.arr.push(item);
                                        this.setState({
                                          cartArr: this.arr,
                                        });
                                        // console.log(
                                        //   "arrrrrr>>",
                                        //   this.state.cartArr
                                        // );
                                      }}
                                    >
                                      +
                                    </Button>
                                  </Col>
                                </Row>

                                <Button
                                  color="light"
                                  size="sm"
                                  onClick={() => {
                                    this.index = index;
                                    this.itemId = item.id;
                                    this.setState({
                                      modal: true,
                                    });
                                  }}
                                >
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      );
                    })}
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col style={{ textAlign: "center", padding: "10px" }}>
                      <h6>Total: £{price}</h6>
                    </Col>
                  </Row>
                </Col>
                <Col></Col>
              </Row>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Spinner color="primary" />
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default ProductsList;
