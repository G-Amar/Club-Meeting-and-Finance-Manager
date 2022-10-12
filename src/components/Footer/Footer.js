import styles from './Footer.module.css';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer id={styles.mainFooter}>
      <section id={styles.footerText}>
        Here is the footer of the website.
      </section>
      <Logo></Logo>
      <section id={styles.copyright}>
        Copyright &copy; 2022. All Rights Reserved.
      </section>
    </footer>
  );
};
export default Footer;
