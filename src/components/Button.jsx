import styles from "../styles/Button.module.css";

export default function CustomButton({ children, onClick, type = "button", ...props }) {
    return (
        <button
            className={styles.button}
            type={type}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}