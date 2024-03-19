import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useGetWidgetsQuery, useAddWidgetMutation } from '../../../api/widgets'; // Import your widget API functions

const WidgetSelectionPage = () => {
    const userId = useSelector((state) => state.user.credentials.user.userId);
    const { data: widgets, isLoading, error } = useGetWidgetsQuery(); // Destructure data, isLoading, and error from the hook

    const HandleAddWidget = (widgetId) => {
        // Add selected widget to the user's profile
        useAddWidgetMutation({ type: widgetId, userId })
            .then(() => console.log('Widget added to profile successfully'))
            .catch((error) => console.error('Error adding widget to profile:', error));
    };

    if (isLoading) return <div>Loading...</div>; // Show loading message while fetching data
    if (error) return <div>Error: {error.message}</div>; // Show error message if data fetching fails

    return (
        <div>
            <h1>Available Widgets</h1>
            <ul>
                {widgets.map((widget) => (
                    <li key={widget.id}>
                        {/* Render widgets dynamically based on their type */}
                        <WidgetSelector widget={widget} addWidget={HandleAddWidget} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

WidgetSelectionPage.propTypes = {
    widgets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            // Add other properties as needed
        })
    ).isRequired,
    addWidget: PropTypes.func.isRequired,
};

const WidgetSelector = ({ widget, addWidget }) => {
    // Example: Weather widget
    if (widget.type === 'weather') {
        return (
            <div>
                <h2>{widget.name}</h2>
                <button onClick={() => addWidget(widget.id)}>Add to Profile</button>
            </div>
        );
    }
    // Add other widget types here

    // Default case (unsupported widget type)
    return (
        <div>
            <p>Unsupported widget type: {widget.type}</p>
        </div>
    );
};

WidgetSelector.propTypes = {
    widget: PropTypes.object.isRequired,
    addWidget: PropTypes.func.isRequired,
};

export default WidgetSelectionPage;



