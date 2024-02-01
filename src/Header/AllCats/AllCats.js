import React, {useEffect, useState} from 'react';
import style from'./AllCats.module.css'
import InfiniteScroll from "react-infinite-scroll-component";


		const headers = new Headers({
			"Content-Type": "application/json",
			"x-api-key": "live_vv9CRExVqiygsL4OtHsDnTlQKaAfg75NoZqvJ9RjbPg7w4RUozZzNXuEXKNKNg6m"
		});

		var requestOptions = {
			method: 'GET',
			headers: headers,
			redirect: 'follow'
		};

const AllCats = () => {

	const [allCats, setAllCats] = useState([])
	const [newFavCats, setNewFavCats] = useState(JSON.parse(localStorage.getItem('FavoriteCats')) || [])
	const [page, setPage] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const fetchMoreData = () => {
		setIsLoading(true)
		const currentPage = page + 1
		fetch(`https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=ASC&page=${currentPage}&limit=25`, requestOptions)
			.then(response => response.json())
			.then(result => {
				setAllCats([...allCats, ...result])
				setPage(currentPage)
				setIsLoading(false)
			})
			.catch(error => console.log('error', error));
	};

	useEffect(() => {
		fetchMoreData()
	}, []);

	return (
		<div>
			<InfiniteScroll
				className={style.allCatsContainer}
				next={fetchMoreData}
				hasMore={true}
				loader={null}
				dataLength={allCats.length}>

				{allCats.map(item => {

					const result = newFavCats.find(favoriteCats => {
						return favoriteCats.id === item.id
					})

					const favorites = (selectedItem) => {
						if (result) {
							const upData =  [...newFavCats].filter(favItem => favItem.id !== selectedItem.id)
							localStorage.setItem('FavoriteCats', JSON.stringify(upData))
							setNewFavCats(upData)
						} else {
							const upData =  [...newFavCats, selectedItem]
							localStorage.setItem('FavoriteCats', JSON.stringify(upData))
							setNewFavCats(upData)
						}
					}

					return (
						<div className={style.allCatsItem} style={{backgroundImage: `url(${item.url})`}} key={`cats-${item.id}`}>
							<svg className={style.svg} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
									 onClick={(event) => {
										 event.preventDefault()
										 event.stopPropagation()
										 favorites(item)
									 }}>
								<g clip-path="url(#clip0_1_2165)">
									{
										result ? <path
												d="M24 42.7L21.1 40.06C10.8 30.72 4 24.56 4 17C4 10.84 8.84 6 15 6C18.48 6 21.82 7.62 24 10.18C26.18 7.62 29.52 6 33 6C39.16 6 44 10.84 44 17C44 24.56 37.2 30.72 26.9 40.08L24 42.7Z"
												fill="#F24E1E"/>
											:
											<path
												d="M33 6C29.52 6 26.18 7.62 24 10.18C21.82 7.62 18.48 6 15 6C8.84 6 4 10.84 4 17C4 24.56 10.8 30.72 21.1 40.08L24 42.7L26.9 40.06C37.2 30.72 44 24.56 44 17C44 10.84 39.16 6 33 6ZM24.2 37.1L24 37.3L23.8 37.1C14.28 28.48 8 22.78 8 17C8 13 11 10 15 10C18.08 10 21.08 11.98 22.14 14.72H25.88C26.92 11.98 29.92 10 33 10C37 10 40 13 40 17C40 22.78 33.72 28.48 24.2 37.1Z"
												fill="#F24E1E"/>
									}
								</g>
								<defs>
									<clipPath id="clip0_1_2165">
										<rect width="48" height="48" fill="white"/>
									</clipPath>
								</defs>
							</svg>
						</div>
					)
				})}
			</InfiniteScroll>
			{isLoading && <div className={style.loader}>... загружаем еще котиков ...</div>}

		</div>

	);
};

export default AllCats;