import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails, updateUserProfile} from '../actions/userActions';

const ProfileScreen = ({history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const {loading, error, user} = useSelector(state=>state.userDetails);

    const {userInfo} = useSelector(state=>state.userLogin);

    const {success} = useSelector(state=>state.userProfileUpdate);


    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [userInfo, user, history, dispatch])


    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage(`Passwords don't match`)
        } else {
            setMessage(null);
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }

    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile successfully updated</Message>}
                {loading && <Loader/>}            
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name </Form.Label>
                        <Form.Control type='text' placeholder='Enter Your Name' value={name} onChange={e => setName(e.target.value)} /> 
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)} /> 
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)} /> 
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Re-Enter Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /> 
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>

            

        </Row>
    )
}

export default ProfileScreen;
