export default function PopUp({ isOpen, closePopup }) {
	return (
		<>
			{isOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 z-50"
					onClick={closePopup}
				></div>
			)}

			{isOpen && (
				<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl border-2 border-green-500 z-50 w-11/12 max-w-md">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold font-roboto-condensed text-green-500 text-center">
							About This Web App
						</h2>

						<button
							className="text-gray-500 hover:text-gray-900"
							onClick={closePopup}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<div className="mt-4">
						<p className="text-gray-700 font-roboto-condensed mb-4">
							Welcome to our podcast discovery app! Our app allows you to
							explore the top trending podcasts across various categories...
						</p>

						<img
							src="./microphone.svg"
							alt="Microphone Icon"
							className="h-20 w-20 mx-auto mb-4"
						/>
						<p className="text-gray-700 font-roboto-condensed">
							You can search and listen to any podcast for free without creating
							an account.
						</p>
					</div>
				</div>
			)}
		</>
	);
}
