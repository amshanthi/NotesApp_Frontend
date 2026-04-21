function PostActions({ onView, onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button onClick={onView}>View</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
export default PostActions;
