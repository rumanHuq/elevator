import styled from "@emotion/styled";

const ButtonWrapper = styled.button`
  cursor: pointer;
`;

export const Button = ({ onClick }: { onClick: React.DOMAttributes<HTMLButtonElement>["onClick"] }) => {
  return (
    <ButtonWrapper type="button" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="12px" height="12px">
        <linearGradient
          id="_HzYuvX_qbk4PQEDGR3ELa"
          x1="9.858"
          x2="38.142"
          y1="9.858"
          y2="38.142"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#33bef0" />
          <stop offset="1" stopColor="#22a5e2" />
        </linearGradient>
        <path
          fill="url(#_HzYuvX_qbk4PQEDGR3ELa)"
          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
        />
        <radialGradient id="_HzYuvX_qbk4PQEDGR3ELb" cx="24" cy="24" r="18.5" gradientUnits="userSpaceOnUse">
          <stop offset=".847" />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
        <circle cx="24" cy="24" r="18.5" fill="url(#_HzYuvX_qbk4PQEDGR3ELb)" opacity=".15" />
        <radialGradient id="_HzYuvX_qbk4PQEDGR3ELc" cx="14.575" cy="11.186" r="33.45" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fafafb" />
          <stop offset=".293" stopColor="#f6f7f8" />
          <stop offset=".566" stopColor="#ebecee" />
          <stop offset=".832" stopColor="#d8dcdf" />
          <stop offset="1" stopColor="#c8cdd1" />
        </radialGradient>
        <circle cx="24" cy="24" r="17" fill="url(#_HzYuvX_qbk4PQEDGR3ELc)" />
      </svg>
    </ButtonWrapper>
  );
};
