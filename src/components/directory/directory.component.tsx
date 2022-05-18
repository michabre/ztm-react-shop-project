import DirectoryItem from '../directory-item/directory-item.component'
import './directory.styles.scss'

const Directory = ({ categories }:{ categories:any}) => {
  return (
    <div className="directory-container">
      {categories.map((category:any) => (
        <DirectoryItem key={category.id} category={category} />
        )
      )}
    </div>
  )
}

export default Directory