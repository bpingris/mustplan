import { useRouter } from "next/router";

export default function ActiveLink({ children, href, ...rest }) {
  const router = useRouter();

  const onClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
