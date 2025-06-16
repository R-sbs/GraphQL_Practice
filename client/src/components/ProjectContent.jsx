import React from 'react'

const ProjectContent = ({project}) => {
  return (
    <div>{project?.client?.name}</div>
  )
}

export default ProjectContent

