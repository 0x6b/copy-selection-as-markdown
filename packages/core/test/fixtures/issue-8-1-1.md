Then, expressing $o_j$ as

$$o_j=\tfrac{1}{\Omega}e^{z_j} \,,\, \Omega=\sum_ie^{z_i} \implies \log o_j=z_j-\log\Omega$$

 we have

$$\frac{\partial \log o_j}{\partial z_k}=\delta_{jk}-\frac{1}{\Omega}\frac{\partial\Omega}{\partial z_k}$$

 where $\delta_{jk}$ is the [Kronecker delta](https://en.wikipedia.org/wiki/Kronecker_delta). Then the gradient of the softmax-denominator is

$$\frac{\partial\Omega}{\partial z_k}=\sum_ie^{z_i}\delta_{ik}=e^{z_k}$$

 which gives

$$\frac{\partial \log o_j}{\partial z_k}=\delta_{jk}-o_k$$

 or, expanding the log

$$\frac{\partial o_j}{\partial z_k}=o_j(\delta_{jk}-o_k)$$

 Note that the derivative is with respect to $z_k$, an _arbitrary_ component of $z$, which gives the $\delta_{jk}$ term ($=1$ only when $k=j$).
