/* eslint-disable react/prop-types */

export default function Button({ children, className, ...props }) {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
