import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setHasNext, setHasBack, setNextText } from '../../features/buy_form_screen_slice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Spinner from '../spinner'

export default function BuyFormDone() {

  // Redux data
  const dispatch = useDispatch()
  const email = useSelector(state => state.buyFormData.email)
  const setSelected = useSelector(state => state.buyFormData.setSelected)
  const colorsNum = useSelector(state => state.buyFormData.colorsNum)
  const colorSelected = useSelector(state => state.buyFormData.colorSelected)
  const logoColor1 = useSelector(state => state.buyFormData.logoColor1)
  const logoColor2 = useSelector(state => state.buyFormData.logoColor2)
  const logoColor3 = useSelector(state => state.buyFormData.logoColor3)
  const logoFile = useSelector(state => state.buyFormData.logoFile)
  const includedExtras = useSelector(state => state.buyFormData.includedExtras)
  const promoCode = useSelector(state => state.buyFormData.promoCode)
  const fullName = useSelector(state => state.buyFormData.fullName)
  const country = useSelector(state => state.buyFormData.country)
  const state = useSelector(state => state.buyFormData.state)
  const city = useSelector(state => state.buyFormData.city)
  const postalCode = useSelector(state => state.buyFormData.postalCode)
  const streetAddress = useSelector(state => state.buyFormData.streetAddress)
  const phone = useSelector(state => state.buyFormData.phone)
  const total = useSelector(state => state.buyFormData.value)

  // Clean data
  const extrasNames = includedExtras.map(extra => extra.name)

  // Env variables
  const apiBase = import.meta.env.VITE_DASHBOARD_API

  useEffect(() => {


    // Update buttons when load
    dispatch(setHasNext(false))
    dispatch(setHasBack(true))
    dispatch(setNextText("Loading..."))

    // Encode data
    const data = {
      "email": email,
      "set": setSelected,
      "colors_num": colorsNum,
      "set_color": colorSelected,
      "logo_color_1": logoColor1,
      "logo_color_2": logoColor2,
      "logo_color_3": logoColor3,
      "logo": logoFile,
      "included_extras": extrasNames,
      "promo_code": promoCode,
      "full_name": fullName,
      "country": country,
      "state": state,
      "city": city,
      "postal_code": postalCode,
      "street_address": streetAddress,
      "phone": phone,
      "total": total,
    }

    // Start sweetalert
    const MySwal = withReactContent(Swal)

    // Save sale in dashboard
    const dataJson = JSON.stringify(data)
    const endpoint = `${apiBase}/store/sale/`
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dataJson
    })
    .then(response => {
      // Validate response status
      if (response.ok) {
        return response.json()
      }
      throw response.json()
    })
    .then(data => {

      console.log(data)
      
      // Show alert success
      MySwal.fire({
        title: "Thank you for your order!",
        text: "After the payment is confirmed, you will receive a confirmation email with the details of your trackers .",
        showConfirmButton: true,
        icon: "success",
      })
      .then(() => {
        // Refresh page
        window.location.reload()
      })

    })
    .catch(error => {

      console.error(error)
      
      // Show alert error
      MySwal.fire({
        title: "Error",
        text: "There was an error processing your order. Please try again later.",
        showConfirmButton: true,
        icon: "error",
      })
      .then(() => {
        // Refresh page
        window.location.reload()
      })

    })
    
  }, [])


  return (
    <section
      className="done"
    >
      <Spinner
        isLoading={true}
      />
    </section>
  )
}