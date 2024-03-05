import PropTypes from 'prop-types';

function Button(props) {
    const clicker = (e) => {
        e.preventDefault();
        if (typeof props.click === 'function') {
            props.click();
        } else {
            console.error("click function is not defined in props");
        }
    };

    return (
        <>
            {props.form ?
                <input type={"submit"} className={"button " + props.theme} value={props.vl} onClick={clicker}/>
                :
                <button className={"button " + props.theme} onClick={clicker}>{props.vl || props.children}</button>
            }
        </>
    );
}

Button.propTypes = {
    click: PropTypes.func.isRequired, // Ensure that click is a function
    form: PropTypes.bool,
    theme: PropTypes.string,
    vl: PropTypes.string,
    children: PropTypes.node,
};

export default Button;