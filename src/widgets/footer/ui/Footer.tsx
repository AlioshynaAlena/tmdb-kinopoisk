import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span >© 2026 Kinopoisk Demo · Data courtesy of TMDB.</span>
      </div>
    </footer>
  )
}
