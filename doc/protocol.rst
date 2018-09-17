Protocol
========

CashShuffle_ is an extension to CoinShuffle_. The CoinShuffle protocol defines
a sequence of 5 phases (+ a 6th blame phase for identifying protocol
violators). Several details are left implementation defined.

`cashshufflejs` uses this configuration for conformance with the reference
implementation:

- Message types are defined with protobuf_.
- Messages on the wire are preceded by a byte length count represented as an
  unsigned 32-bit integer in big endian byte order.
- Encryption of strings uses the UTF-8 encoding.

.. _CashShuffle: https://cashshuffle.com/
.. _CoinShuffle: http://crypsys.mmci.uni-saarland.de/projects/CoinShuffle/
.. _protobuf: https://developers.google.com/protocol-buffers/

.. autofunction:: protocol.Phase

.. autofunction:: protocol.Reason

.. autofunction:: protocol.Invalid

.. autofunction:: protocol.Address

.. autofunction:: protocol.DecryptionKey

.. autofunction:: protocol.EncryptionKey

.. autofunction:: protocol.Hash

.. autofunction:: protocol.InputSignature

.. autofunction:: protocol.Registration

.. autofunction:: protocol.Signature

.. autofunction:: protocol.Transaction

.. autofunction:: protocol.VerificationKey

.. autofunction:: protocol.Message

.. autofunction:: protocol.Packet

.. autofunction:: protocol.Signed

.. autofunction:: protocol.Packets

.. autofunction:: protocol.Blame
