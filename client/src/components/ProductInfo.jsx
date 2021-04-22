import React from 'react'
import { Table } from 'react-bootstrap';

const ProductInfo = ({
  productImage,
  productPrice,
}) => (
  <Table>
    <tbody>
      <tr>
        <td>
          <img src={productImage} style={{ height: '100px' }} />
        </td>
      </tr>
      <tr>
        <td>
          Price: ${productPrice}
        </td>
      </tr>
    </tbody>
  </Table>
);

export default ProductInfo;