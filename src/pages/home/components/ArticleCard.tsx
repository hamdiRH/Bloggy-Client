import moment from "moment-timezone"
import { Link } from 'react-router-dom';

export function ArticleCard({ title, slug, user, createdAt }) {
  return (
    <div className='mb-4 p-6 bg-white shadow-sm border rounded break-words'>
      <small className='text-gray-600'>{user.displayName}</small>
      <Link to={`/${user.username}/article/${slug}`}>
        <h1 className='font-semibold text-2xl hover:text-blue-500'>{title}</h1>
      </Link>
      {moment(createdAt).tz('Africa/Tunis').format('L')}
    </div>
  );
}

export default ArticleCard;
