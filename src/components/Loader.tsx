import styled from "@emotion/styled";

interface Props {
  size: string;
}

const Container = styled("div")`
  width: ${(props: Props) => props?.size || "16px"};
  height: ${(props: Props) => props?.size || "16px"};
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #766df4 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #766df4);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;
  @keyframes s3 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
const Loader = ({ size }: Props) => (
  <Container size={size} data-testid="loader" />
);

export default Loader;
