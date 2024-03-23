import UserRegisterInitForm from "../component/UserRegisterInitForm";

const UserRegisterInitPage = ({ top = '5.5%', bottom = 'auto', formWidth = '25%', marginRight = '40%' }) => {
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
                <UserRegisterInitForm />
            </div>
        </div>
    );
}

export default UserRegisterInitPage;