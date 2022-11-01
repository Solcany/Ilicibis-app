const ErrorOverlay = ({ error, isVisible }) => {
  return (
    <>
      {isVisible && (
        <div className="">
          <p>{error}</p>
        </div>
      )}
    </>
  );
};