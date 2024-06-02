const Footer = ({ footerText }) => {
    return (
        <footer style={{ textAlign: "center", marginBottom: 10 }}>
            <p>
                {footerText}{" "}
                <a
                    href="https://github.com/RadomirSorak"
                    style={{ cursor: "pointer" }}
                >
                    Radomir Sorak
                </a>
            </p>
        </footer>
    );
}

export default Footer;
