function Tags(props) {
    return (
        <>
            <h2>Tags</h2>
            <div className="tags">
                {props.data ? props.data.map((i, idx) =>
                    <div className="tag" key={idx}>
                        {i.tag.name}
                    </div>
                ) : (
                    <div>No tags available</div> // Placeholder JSX when props.data is undefined
                )}
            </div>
        </>
    )
}

export default Tags;
