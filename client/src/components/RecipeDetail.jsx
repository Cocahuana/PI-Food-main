import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../actions';
import { useEffect } from 'react';
import './RecipeDetail.css';

export default function RecipeDetail(props) {
	const dispatch = useDispatch();
	const id = props.match.params.id;
	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		dispatch(getDetails(id));
	}, [dispatch, id]);

	const myRecipe = useSelector((state) => state.recipesDetail);

	if (loading) {
		return (
			<div className='details-grid' key={id}>
				<h2 className='error-msg'>Loading...</h2>
			</div>
		);
	}

	return (
		<div className='details-grid' key={id}>
			<div className='details-container'>
				<div className='detail-container'>
					<img
						className='detail-img'
						src={myRecipe.img}
						alt='img not found'
						width='400px'
						height='500px'
					/>
					<div className='info-aside'>
						<div className='title-container'>
							<h1 className='detail-title'>{myRecipe.title}</h1>
							<h3 className='detail-healthScore'>
								{myRecipe.healthScore}
							</h3>
						</div>
						<div className='diets-container'>
							<h3 className='diets-h3'>Diet Type</h3>
							<div className='showDiet'>
								<div className='border'></div>
								{
									//Es importante el ? porque así el map no es undefined. Como que le da tiempo a la api a traer la info
									myRecipe.dietTypes?.map((e) => (
										<div
											className='diets-h5-container'
											key={e}>
											<h3 className='diets-h5' key={e}>
												{e}
											</h3>
										</div>
									))
								}
								<div className='border'></div>
								<div className='diets-h5-container'>
									<h3 className='diets-h5'>
										{myRecipe.createdInDb}
									</h3>
								</div>
							</div>
						</div>
						{/*inner atribute for html dangerouslySetInnerHTML, is a property that you can use on HTML elements in a React application to programmatically set their content*/}
						<div className='summary-container'>
							<h3 className='detail-summary-h3'>Summary</h3>
							<div className='border'></div>
							<p className='detail-summary-p'>
								<div
									dangerouslySetInnerHTML={{
										__html: myRecipe.summary,
									}}
								/>
							</p>
							<div className='border'></div>
						</div>
					</div>
				</div>
				<div className='steps-container'>
					<h3 className='steps-h3'>Steps</h3>
					<ul className='steps'>
						{Array.isArray(myRecipe.analyzedInstructions) ? (
							myRecipe.analyzedInstructions.map((e) => {
								return (
									<div className='step'>
										<p>
											<strong>{e.number + ') '}</strong>
										</p>
										<li key={e.number}>{e.step}</li>
									</div>
								);
							})
						) : (
							//Si no tengo analyzedInstructions, renderizo los que contengan steps
							//myRecipe.steps
							<li>{myRecipe.stepFromDb}</li>
						)}
					</ul>
					<div className='goBack'>
						<Link to='/home'>
							<button className='CTA-goBack'>Volver</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
