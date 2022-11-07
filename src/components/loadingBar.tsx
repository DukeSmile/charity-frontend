import { CircularProgress, Modal } from "@material-ui/core";

const LoadingBar = (props: any) => {
  return (
    <Modal
      open={props.open}
      className="w-full h-full m-auto mt-35 flex justify-center items-center outline-none"
    >
      <div>
        <CircularProgress />
      </div>
    </Modal>
  );
};

export default LoadingBar;
