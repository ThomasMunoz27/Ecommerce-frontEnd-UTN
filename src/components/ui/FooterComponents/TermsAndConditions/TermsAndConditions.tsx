import style from './TermsAndConditions.module.css'

export const TermsAndConditions = () => {
    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitle}>
                <h1>Términos y Condiciones</h1>
            </div>
            <div className={style.containerContent}>
                <p>Última actualización: 10/06/2025</p>
                <p>
                    Bienvenido a <strong>Campeones.com</strong>. Al acceder y utilizar este sitio web, 
                    aceptas estar sujeto a los siguientes términos y condiciones. Por favor, léelos cuidadosamente.
                </p>

                <ol>
                    <li><strong>Uso del Sitio</strong></li>
                </ol>
                <p>
                    El acceso a este sitio es solo para uso personal y no comercial. Estás de acuerdo en no utilizar el sitio para 
                    actividades ilegales o no autorizadas.
                </p>

                <ol start={2}>
                    <li><strong>Propiedad Intelectual</strong></li>
                </ol>
                <p>
                    Todo el contenido de este sitio, incluyendo textos, imágenes, logotipos y gráficos, es propiedad de 
                    <strong> Campeones.com</strong> y está protegido por las leyes de propiedad intelectual. No puedes copiar, 
                    reproducir o distribuir este contenido sin nuestro consentimiento previo.
                </p>

                <ol start={3}>
                    <li><strong>Política de Compras</strong></li>
                </ol>
                <p>
                    Todas las compras realizadas en nuestro sitio están sujetas a disponibilidad y aceptación. Nos reservamos el derecho 
                    de cancelar pedidos si la información proporcionada es incorrecta o si los productos no están disponibles.
                </p>

                <ol start={4}>
                    <li><strong>Devoluciones y Reembolsos</strong></li>
                </ol>
                <p>
                    Ofrecemos devoluciones y reembolsos según nuestra política de devoluciones. Por favor, revisa esta política antes 
                    de realizar una compra.
                </p>

                <ol start={5}>
                    <li><strong>Limitación de Responsabilidad</strong></li>
                </ol>
                <p>
                    No somos responsables de daños directos o indirectos que puedan surgir del uso de este sitio, incluyendo pérdida 
                    de datos, ingresos o ganancias.
                </p>

                <ol start={6}>
                    <li><strong>Modificaciones de los Términos</strong></li>
                </ol>
                <p>
                    Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será 
                    publicado en esta página.
                </p>

                <ol start={7}>
                    <li><strong>Contacto</strong></li>
                </ol>
                <p>
                    Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos en:
                </p>
                <ul>
                    <li>
                        <strong>Correo electrónico:</strong> <a href="mailto:contacto@campeones.com">contacto@campeones.com</a>
                    </li>
                    <li><strong>Teléfono:</strong> +5491123456789</li>
                </ul>

                <p>
                    Gracias por visitar <strong>Campeones.com</strong>. Al utilizar nuestro sitio, aceptas cumplir con estos términos 
                    y condiciones.
                </p>
            </div>
        </div>
    )
}