import { Card, Button, Row, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";  //redux action
import toast, { Toaster } from 'react-hot-toast';



const ProductForListComponent = ({ productId, name, description, price, images, rating, reviewsNumber }) => {

  const { mode }  = useSelector((state) => state.DarkMode)

  const dispatch = useDispatch();

  const addToCartHandler = () => {    
      // console.log(productId)
      dispatch(addToCart(productId, 1));
      // setShowCartMessage(true);

      // https://react-hot-toast.com/https://react-hot-toast.com/
      toast.success('Added item to cart!',
      {
        // icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );
    };


  // console.log('productforlistcomponent')
  // console.log({mode})

  const styles = {
    color: 'black',
    backgroundColor:'white',
    marginTop: "30px",
    marginBottom: "50px"
  }

  const darkStyles = {
    color: 'white',
    backgroundColor:'black',
    marginTop: "30px",
    marginBottom: "50px"
  }

  const productCardStyle = mode === 'light' ? styles : darkStyles;


  {console.log(images[0])}

  return (
    <>
    <Toaster/>
    <Card style={productCardStyle}>
      <Row>
        <Col lg={5}>
          <Card.Img
            crossOrigin="anonymous"
            variant="top"            
            // src={
            //   images[0] ?
            //   (mode === 'dark' ?
            //     images[0].path.replace('/upload/', '/upload/e_background_removal/') :
            //     images[0].path
            //   ) : ''
            // }
            src={images[0] ? images[0].path : ''}
          />
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={rating} /> ({reviewsNumber})
            </Card.Text>
            <Card.Text className="h4">
              ${price}{" "}
              <LinkContainer to={`/product-details/${productId}`}>
                <Button variant="danger">See product</Button>
              </LinkContainer>
              
              <Button onClick={() => addToCartHandler(productId)} variant="success" style={{ marginLeft: '10px' }}>
                Add to cart
              </Button>
                    
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
    </>
  );
};

export default ProductForListComponent;

