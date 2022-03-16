import CategoryItem from '../category-item/category-item.component'
import './directory.styles.scss'

const Directory = ({ categories }:{ categories:any}) => {
  return (
    <div className="directory-container">
      {categories.map((category:any) => (
        <CategoryItem key={category.id} category={category} />
        )
      )}
    </div>
  )
}

export default Directory