const Loading = () => {
  return (
    <div className="w-full min-h-screen h-full flex gap-2 items-center justify-center">
      <span className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-2 border-t-teal border-gray-200"></span>
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
