import ErrorMessage from "./ErrorMessage";

const AsyncStateHandler = ({ loading, error, render }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage message={error} />;
  return render();
};

export default AsyncStateHandler;