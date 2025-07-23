# React + TypeScript + Vite

username: admin
password: 1234

**frontend**
- react ts
- ProtectedRoute
- use zustand+persist ^5.x.x
- react-router-dom ^7.x.x
  
**backend** 
- nodejs
- use JWT
- refresh-token

**Recommand Set Time**
<table>
  <thead>
    <th>Token Age</th>
    <th>Call checkToken() every</th>
    <th>Call refreshToken() when</th>
  </thead>
  <tbody>
    <tr>
      <td>1m</td>
      <td>10 - 30 ms</td>
      <td>< 30 ms</td>
    </tr>
    <tr>
      <td>5m</td>
      <td>1m</td>
      <td>< 1m</td>
    </tr>
    <tr>
      <td>10m</td>
      <td>2m</td>
      <td>< 2m</td>
    </tr>
  </tbody>
</table>
