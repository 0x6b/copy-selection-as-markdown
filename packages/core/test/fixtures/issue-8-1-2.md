**Update:** In response to a query from the OP in the comments, here is an expansion of the first step. First, note that the vector chain rule requires summations (see [here](https://en.wikipedia.org/wiki/Chain_rule#Higher_dimensions)). Second, to be certain of getting _all_ gradient components, you should always introduce a _new_ subscript letter for the component in the denominator of the partial derivative. So to fully write out the gradient with the full chain rule, we have

$$\frac{\partial E}{\partial w_{pq}}=\sum_i \frac{\partial E}{\partial o_i}\frac{\partial o_i}{\partial w_{pq}}$$

 and

$$\frac{\partial o_i}{\partial w_{pq}}=\sum_k \frac{\partial o_i}{\partial z_k}\frac{\partial z_k}{\partial w_{pq}}$$

 so

$$\frac{\partial E}{\partial w_{pq}}=\sum_i \left[ \frac{\partial E}{\partial o_i}\left(\sum_k \frac{\partial o_i}{\partial z_k}\frac{\partial z_k}{\partial w_{pq}}\right) \right]$$

 In practice the full summations reduce, because you get a lot of $\delta_{ab}$ terms. Although it involves a lot of perhaps "extra" summations and subscripts, using the full chain rule will ensure you always get the correct result.
