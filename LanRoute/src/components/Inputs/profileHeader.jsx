import { useGetUserQuery } from '../../api/auth';
import Avatar from './avatar';
import '../Styles/profileHeader.css'; // Import CSS for styling

const ProfileHeader = () => {
    const { data, isLoading, isError } = useGetUserQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching user data</div>;
    }

    if (!data) {
        return null; // or render a placeholder while data is being fetched
    }

    return (
        <div className='profile-header-container'>
            <div className='cover-photo'></div> {/* Optionally, add a cover photo/banner */}
            <div className='profile-info'>
                <Avatar mod={false} />
                <div className='user-details'>
                    <h2>{data.username}</h2>
                    <p>{data.bio}</p>
                    <p>{data.location}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;




