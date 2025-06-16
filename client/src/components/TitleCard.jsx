import { Card, CardTitle } from '@@/components/ui/card'
import React from 'react'

const TitleCard = ({title}) => {
  return (
    <Card>
        <CardTitle>{title}</CardTitle>
    </Card>
  )
}

export default TitleCard