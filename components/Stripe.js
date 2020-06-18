import React, { useEffect, useState } from "react";
import stripe_css from "../css/stripe.module.css";

function format(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function num(num) {
	return (((num || "") + "").replace(/[^0-9\.\-]/gi, "") || 0) * 1;
}

export default function Map(props) {
	const [useCustomAmount, setUseCustomAmount] = useState(false);
	const [fields, setFields] = useState({
		amount: 50,
	});
	const [response, setResponse] = useState({});

	const setValue = (key, value) => {
		let updateFields = { ...fields };
		updateFields[key] = value;
		setFields(updateFields);
		console.log("fields are", fields);
	};

	useEffect(() => {
		const onLoad = () => {
			console.log("exec stripe on form");
			document
				.querySelector("#stripeElements")
				.setAttribute("data-ready", "1");

			let pk =
				process.env.STRIPE_PUBLIC ||
				"pk_test_51GvEQwLe7hUMH3W59ROr76MUKnm9Bowt8lZ4QMnGLaALu41kXuF1qX47mtjSLfwfVwuiBnP4PuI36ReryayJE02C008ouVbLzs";

			let stripe = Stripe(pk);
			let elements = stripe.elements();
			let style = {
				base: {
					color: "#828282",
					fontFamily:
						'"noto sans", "Helvetica Neue", Helvetica, sans-serif',
					fontSmoothing: "antialiased",
					fontSize: "16px",
					borderRadius: "5px",
					"::placeholder": {
						color: "#aab7c4",
					},
				},
				invalid: {
					color: "#fa755a",
					iconColor: "#fa755a",
				},
			};
			let card = elements.create("card", {
				style: style,
				cssSrc: "https://fonts.googleapis.com/css?family=Noto+Sans",
			});
			card.mount("#card-element");

			document
				.querySelector("#payment-form")
				.addEventListener("submit", (e) => {
					e.preventDefault();
					stripe.createToken(card).then(function (result) {
						if (result.error) {
							// Inform the customer that there was an error.
							var errorElement = document.getElementById(
								"card-errors"
							);
							errorElement.textContent = result.error.message;
						} else {
							setValue("token", result.token.id);
							sendApi();
						}
					});
				});

			const sendApi = () => {
				console.log('sending fields', fields)
				fetch("/api/donation", {
					method: "post",
					body: JSON.stringify(fields)
				})
					.then(function (response) {
						console.log('response is', response);
						return response.json();
					})
					.then(function (data) {
						setResponse(data);
						console.log("response is", response);
					});
			};

		};

		if (!document.querySelector("#stripeElements")) {
			const script = document.createElement(`script`);
			script.id = "stripeElements";
			script.src = `https://js.stripe.com/v3/`;
			document.head.append(script);
			script.addEventListener(`load`, onLoad);
			return () => script.removeEventListener(`load`, onLoad);
		} else {
			const script = document.querySelector("#stripeElements");
			if (script) {
				if (script.getAttribute("data-ready")) {
					onLoad();
				} else {
					script.addEventListener(`load`, onLoad);
					return () => script.removeEventListener(`load`, onLoad);
				}
			} else {
				onLoad();
			}
		}
	}, []);

	useEffect(() => {}, [fields]);

	let amounts = [15, 25, 50, 100, 150, 200, 300, 500, 750, 1000];

	console.log("render");

	return (
		<div className={stripe_css.stripe}>
			<form
				action="/api/donation"
				method="post"
				id="payment-form"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className={stripe_css.formRow}>
					<label htmlFor="card-name">Name On Card</label>
					<input
						type="text"
						name="name"
						id="card-name"
						placeholder="Name On Card"
						onChange={(e) => setValue("name", e.target.value)}
					/>
				</div>
				<div className={stripe_css.formRow}>
					<label htmlFor="card-email">Email Address</label>
					<div className={stripe_css.subLabel}>
						For an email receipt
					</div>
					<input
						type="text"
						name="email"
						id="card-email"
						value={fields.name || ""}
						placeholder="my@email.com"
						onChange={(e) => setValue("name", e.target.value)}
					/>
				</div>
				<div className={stripe_css.formRow}>
					<label htmlFor="card-donate-name">
						Name For Donation Shout Out
					</label>
					<div className={stripe_css.subLabel}>
						You can leave this blank to donate anonymously
					</div>
					<input
						type="text"
						name="donate-name"
						id="card-donate-name"
						value={fields.email || ""}
						placeholder="e.g. John Doe"
						onChange={(e) => setValue("donateName", e.target.value)}
					/>
				</div>
				<div className={stripe_css.formRow}>
					<label htmlFor="card-name">Donation Amount</label>
					{amounts.map((n) => (
						<span
							key={n}
							className={
								stripe_css.amount_box +
								" " +
								(fields.amount === n
									? stripe_css.amount_selected
									: "")
							}
							onClick={(e) => {
								setValue("amount", n);
							}}
						>
							${format(n)}
						</span>
					))}
					<span
						className={
							stripe_css.amount_box +
							" " +
							(useCustomAmount ? stripe_css.amount_selected : "")
						}
						onClick={(e) => {
							if (!useCustomAmount) {
								setValue("amount", 5000);
								setUseCustomAmount(true);
							} else {
								// do nothing its already custom
							}
						}}
					>
						Custom
					</span>
					{useCustomAmount && (
						<div>
							<input
								type="number"
								name="custom-amount"
								placeholder="Amount"
								value={fields.amount || ""}
								onChange={(e) =>
									setValue("amount", num(e.target.value))
								}
							/>
						</div>
					)}
				</div>
				<div className={stripe_css.formRow}>
					<label htmlFor="card-element">Credit or debit card</label>
					<div
						id="card-element"
						className={stripe_css.card_element}
						style={{ margin: "20px 0" }}
					></div>
					<div id="card-errors" role="alert"></div>
				</div>
				<div className="form-row">
					<button>Donate ${format(fields.amount)}</button>
				</div>
			</form>
		</div>
	);
}
