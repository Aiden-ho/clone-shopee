import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path.constants'
import { AppContext } from 'src/context/app.context'
import { ProductSearchFormDataType, productSearchSchema } from 'src/utils/ValidateRule'
import { HandleSearchHistory, setSearchHistoryToLS } from 'src/utils/search'
import { beautySearchString } from 'src/utils/utils'
import useQueryConfig from 'src/hooks/useQueryConfig'

type formData = ProductSearchFormDataType

export default function useSearchProducts() {
  const { historySearch, setHistorySearch } = useContext(AppContext)
  const btnSubmitSearchRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { register, handleSubmit, setValue } = useForm<formData>({
    defaultValues: {
      product_name: ''
    },
    resolver: yupResolver<formData>(productSearchSchema)
  })

  const handleSubmitSearch = handleSubmit((data) => {
    const keyword = beautySearchString(data.product_name)
    //set value search input
    setValue('product_name', keyword, {
      shouldValidate: true,
      shouldDirty: true
    })

    // set history search
    const history = HandleSearchHistory(keyword, historySearch)
    setSearchHistoryToLS(history)
    setHistorySearch(history)
    //navigate
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit({ ...queryConfig, page: '1', name: keyword }, [
          'category',
          'price_min',
          'price_max',
          'rating_filter',
          'order',
          'sort_by'
        ])
      ).toString()
    })
  })

  const handleOnClickHistorySearch = (keyword: string) => {
    setValue('product_name', keyword, {
      shouldValidate: true,
      shouldDirty: true
    })
    if (btnSubmitSearchRef.current) {
      btnSubmitSearchRef.current.click()
    }
  }

  return { register, handleSubmitSearch, handleOnClickHistorySearch, btnSubmitSearchRef }
}
