import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import CliffFacePhoto from "../../../images/cliff_3.png"
import toast, { Toaster } from 'react-hot-toast';


const UserProfilePageComponent = ({ updateUserApiRequest, fetchUser, userInfoFromRedux, setReduxUserState, reduxDispatch, localStorage, sessionStorage }) => {

  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState<any>({ success: "", error: "" });
  const [user, setUser] = useState<any>({})
  const userInfo = userInfoFromRedux;
  // const [passwordsMatchState, setPasswordsMatchState] = useState(true);


  // const [showErrorAlert, setShowErrorAlert] = useState(false);
  // const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // useEffect(() => {

  //   if (updateUserResponseState && updateUserResponseState.error !== "") {
  //     setShowErrorAlert(true);
  //     // Hide the error alert after 3 seconds
  //     setTimeout(() => {
  //       setShowErrorAlert(false);
  //     }, 2500);
  //   } else {
  //     setShowErrorAlert(false);
  //   }

  //   if (updateUserResponseState && updateUserResponseState.success === "user updated") {
  //     setShowSuccessAlert(true);
  //     // Hide the success alert after 3 seconds
  //     setTimeout(() => {
  //       setShowSuccessAlert(false);
  //     }, 2500);
  //   } else {
  //     setShowSuccessAlert(false);
  //   }
  // }, [updateUserResponseState]);


  useEffect(() => {
      fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id])

  // const onChange = () => {
  //   const password = document.querySelector("input[name=password]");
  //   const confirmPassword = document.querySelector("input[name=confirmPassword]");
  //   if (confirmPassword.value === password.value) {
  //     setPasswordsMatchState(true);
  //   } else {
  //     setPasswordsMatchState(false);
  //   }
  // };

  const handleSubmit = async (event) => {
    
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget.elements;    
    const name = form.name.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const zipCode = form.zipCode.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;


    if (password === '') {               
      toast.dismiss()
      toast.error('Please enter your current password to confirm changes to your profile.',{style: {borderRadius: '10px',background: '#333',color: '#fff'}})
      return
    }

    const confirmed = window.confirm("Are you sure you want to update your profile?");
    if (!confirmed) {
      return
    }
    if (event.currentTarget.checkValidity() === true) {
      try {
        const data = await updateUserApiRequest(name, lastName, phoneNumber, address, country, zipCode, city, state, password);
        setUpdateUserResponseState({ success: data.success, error: "" });
        reduxDispatch(setReduxUserState({ doNotLogout: userInfo.doNotLogout, ...data.userUpdated }));
        toast.dismiss();
        toast.success('Successfully updated your profile!', { style: { borderRadius: '10px', background: '#333', color: '#fff' } });

        if (userInfo.doNotLogout) {
          localStorage.setItem("userInfo", JSON.stringify({ doNotLogout: true, ...data.userUpdated }));
        } else {
          sessionStorage.setItem("userInfo", JSON.stringify({ doNotLogout: false, ...data.userUpdated }));
          setTimeout(function () { window.location.assign('/user') }, 1000);
        }
        return


      } catch (er: any) {
        console.log(er)
        if (er.response && er.response.data && er.response.data.message) {
          setUpdateUserResponseState({ error: er.response.data.message })
        } 
        else {
          setUpdateUserResponseState({ error: er.toString() })
        }
        toast.dismiss();
        toast.error(`Failed to update user, invalid password!`, { style: { borderRadius: '10px', background: '#333', color: '#fff' } })
    }
  }
}
    

  return (
    <>
    <Toaster/>
    <img className="cliff_image" alt="ice_climbing_photo" src={CliffFacePhoto} ></img>
    <Container>
      <Row className="mt-5 justify-content-md-center">
      <Col md={6}></Col>
        <Col md={6}>
          <h1>Change your profile</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user?.name}
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user?.lastName}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label >Email address</Form.Label>
              <Form.Control  
                style={{backgroundColor:"darkgray",borderColor:"darkgray"}}
                disabled
                value={user?.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                defaultValue={user?.phoneNumber}
                name="phoneNumber"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street name and house number"
                defaultValue={user?.address}
                name="address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                defaultValue={user?.country}
                name="country"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Zip code"
                defaultValue={user?.zipCode}
                name="zipCode"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                defaultValue={user?.city}
                name="city"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                defaultValue={user?.state}
                name="state"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                // minLength={6}
                // onChange={onChange}
                // isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Enter your password to confirm any changes above.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
            {/* <Alert show={showErrorAlert} variant="danger">
            Something went wrong! Did you enter the correct password?
            </Alert>
            <Alert show={showSuccessAlert} variant="info">
            User updated!
            </Alert> */}
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default UserProfilePageComponent;

