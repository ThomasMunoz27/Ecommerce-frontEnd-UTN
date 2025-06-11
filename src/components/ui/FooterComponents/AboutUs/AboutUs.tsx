import styles from './AboutUs.module.css'

export const AboutUs = () => {
	return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerTitle}>
			  <h2>Nuestros Datos</h2>
      </div>

		<div className={styles.containerData}>

			<p><strong>Nombre comercial:</strong> Campeones</p>
			<p><strong>Razón social:</strong> Campeones.com</p>
			<p><strong>CUIT:</strong> 30-71234567-8</p>
			<p><strong>Teléfono de contacto:</strong> +54 9 11 2345-6789</p>
			<p><strong>Correo electrónico:</strong> campeones@champions.com</p>

			<p><strong>Redes sociales:</strong></p>
			<div className={styles.containerInformation}>
        <div className={styles.info}>
				  <p><strong>Instagram:</strong> @champ_ions</p>

        </div>
        <div className={styles.info}>
				  <p><strong>Facebook:</strong> Campeones Argentina</p>

        </div>
			</div>

			<p>
				En <strong>Campeones</strong> trabajamos cada día para brindarte indumentaria deportiva de calidad, 
				con diseños modernos, cómodos y preparados para el alto rendimiento. Estamos comprometidos con un 
				servicio al cliente rápido y personalizado, y con garantizar la transparencia en cada paso del 
				proceso de compra.
			</p>
		</div>
    </div>
	)
}
