// UserLoginPage.js
import UserLoginForm from "../component/UserLoginForm";

const UserLoginPage = ({ top = '30%', bottom = 'auto', formWidth = '25%', marginRight = '5%' }) => {
    // top controls the distance to the top of the father container
    // bottom controls the distance to the bottom of the father container
    // formWidth controls the width of the form(UserLoginForm)
    // marginRight controls the distance to the right of the father container


    const containerStyle = {
        display: 'flex',   //setting the container as the flex container, thus the children can be aligned with flexbox
        justifyContent: 'flex-end', // aligning the children to the right of the container
        height: '60vh',  // setting the height of the container to be 60% of the viewport height
        position: 'relative',
    };
    // containStyle is the style of the father container

    const formWrapperStyle = {
        width: formWidth,
        position: 'absolute',
        top,
        bottom,
        marginRight,
    };
    // formWrapperStyle is the style of the form wrapper

    return (
        <div style={containerStyle}>
            <div style={formWrapperStyle}>
                <UserLoginForm />
            </div>
        </div>
    );
}

export default UserLoginPage;