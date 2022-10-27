import React, { Fragment } from 'react'

const Footer = () => {
  return (
    <Fragment>
			<footer className="py-1">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6 col-lg-6">
							<p className="m-0 text-center text-md-left">
								&copy; <strong>Blue Bottle Shop</strong>. Todos los
								derechos reservados.
							</p>
						</div>
						<div className="col-md-6 col-lg-6">
							<p className="m-0 text-center text-md-right">
								Diseñado por <strong>La espada del Bolivar</strong>
							</p>
						</div>
					</div>
				</div>
			</footer>
		</Fragment>
  )
}

export default Footer