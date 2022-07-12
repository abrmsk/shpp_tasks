import Link from 'next/link';
import styles from "./Menu.module.css";


export default function FourOhFour() {
  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a
          style={{
            textDecoration: "underline",
            color: "revert"
          }}
        >
          Go back home
        </a>
      </Link>
    </div>
  );
}
